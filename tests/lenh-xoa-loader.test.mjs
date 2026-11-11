import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFile } from 'node:fs/promises'
const source = await readFile(new URL('../public/games/lenh-xoa/loader.js', import.meta.url), 'utf8')
async function boot(mode) {
  const nodes = Object.fromEntries(['canvas','loading','status','details','progress','retry'].map(id=>[id,{hidden:false,textContent:'',focus(){},addEventListener(){},removeAttribute(){}}]))
  let started=false
  class Engine {
    static getMissingFeatures(){return mode==='unsupported'?['WebGL 2']:[]}
    async init(){if(mode==='engine-error')throw Error('Engine failed')}
    copyToFS(name,buffer){assert.equal(name,'index.pck');assert.equal(buffer.byteLength,3)}
    async start(){started=true}
  }
  const window={DecompressionStream}
  const fetch = async (url, options) => {
    if(url==='leaderboard-config.json') {
      if(mode==='config-offline')throw Error('offline')
      if(mode==='config-hang')return new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(Error('timeout'))))
      if(mode==='config-invalid')return new Response('not json')
      if(mode==='config-503')return new Response('unavailable',{status:503})
      return Response.json({url:'https://fixture.supabase.co',anonKey:'sb_publishable_fixture'})
    }
    if(url==='runtime.json')return mode==='missing-runtime'?new Response('',{status:404}):Response.json({engine:{},pack:{file:'index.pck.gz',downloadBytes:3,uncompressedBytes:3}})
    return new Response(new Uint8Array([1,2,3]),{headers:{'content-encoding':'gzip'}})
  }
  await vm.runInNewContext(source,{Engine,window,parent:window,location:{origin:'http://fixture',search:''},document:{getElementById:id=>nodes[id]},console:{log(){},warn(){},error(){}},fetch,Blob,Response,DecompressionStream,URLSearchParams,AbortController,setTimeout:(fn,ms)=>setTimeout(fn,ms===5000?5:ms),clearTimeout})
  return {started,nodes,config:window.lenhXoaLeaderboardConfig}
}
test('valid config starts the game',async()=>{const r=await boot('ok');assert.equal(r.started,true);assert.equal(r.nodes.loading.hidden,true);assert.equal(r.config.url,'https://fixture.supabase.co')})
for(const mode of ['config-offline','config-invalid','config-503','config-hang'])test(mode+' leaves game playable with online board disabled',async()=>{const r=await boot(mode);assert.equal(r.started,true);assert.equal(r.nodes.loading.hidden,true);assert.equal(r.config.url,'');assert.equal(r.config.anonKey,'')})
for(const mode of ['unsupported','engine-error','missing-runtime'])test(mode+' offers retry instead of a blank game',async()=>{const r=await boot(mode);assert.equal(r.started,false);assert.equal(r.nodes.loading.hidden,false);assert.equal(r.nodes.retry.hidden,false);assert.ok(r.nodes.status.textContent.includes('Không thể'))})
