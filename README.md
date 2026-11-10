# Korea Policy Story v2

Interactive React/Vite microsite về quyết định đặc xá Hàn Quốc tháng 8/2022.

## Điểm chính
- Samsung Blue / political-editorial visual language
- Scroll reveal + hover/tap interactions
- Tách trang theo từng chủ đề thay vì nhồi toàn bộ nội dung vào homepage
- Interactive 2D balance illustration (SVG) cho phần Trade-off
- Flipbook portal: sửa `src/config.js` để gắn URL ngoài
- Game hub: sửa `src/config.js` để gắn game bên ngoài hoặc route riêng
- Trang Sources riêng

## Chạy local
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Bảng xếp hạng game

1. Tạo project Supabase và chạy toàn bộ `supabase/schema.sql` trong SQL Editor. Script dùng được cho cả lần thiết lập đầu tiên lẫn nâng cấp bảng đã tạo trước đó.
2. Sao chép `.env.example` thành `.env`, sau đó điền Project URL và anon/public key từ Project Settings → API.
3. Khởi động lại Vite bằng `npm run dev` để nạp biến môi trường.

Sau khi hoàn thành Màn 4, game ghi nhận thời gian hoàn thành và tải bảng xếp hạng dùng chung (tối đa 100 người chơi). Mỗi tên chỉ có một kết quả; nhập lại cùng tên (không phân biệt chữ hoa/thường) chỉ cập nhật thành tích nếu thời gian mới nhanh hơn, còn thành tích tốt nhất hiện có sẽ được giữ nguyên nếu lượt mới chậm hơn hoặc bằng. Nếu bảng hiện có nhiều dòng trùng tên, schema giữ lại kết quả nhanh nhất trong lần nâng cấp.

Chỉ dùng anon/public key ở frontend; không đưa service-role key vào file `.env` của ứng dụng web. Vì người chơi chưa cần đăng nhập, người chơi có thể mạo danh tên khác và kết quả không có cơ chế chống gian lận.


## Latest interaction update

- The homepage hero is now a full-viewport photographic scene pinned during scroll.
- The first content panel slides upward over the hero, physically covering the image.
- Reversing the scroll moves the panel back down so the hero photo is progressively revealed again.
- Hero scale, tint and copy shift are scroll-driven.
- Route changes reset the viewport to the top via a pathname-aware scroll-to-top effect.
- The hero image is from Wikimedia Commons and is licensed CC BY-SA 4.0; see IMAGE-CREDITS.md.

## Lệnh Xóa — Godot 3D

Trang `/game` có thêm game hành động điều tra **Lệnh Xóa** tại `/game/lenh-xoa`.
Trò chơi điều tra bốn màn của nhóm vẫn ở `/game/play`. Nhấn Chơi để bắt đầu tải
bản 3D; dùng máy tính có bàn phím/chuột và trình duyệt hỗ trợ WebGL 2.

Bản Web đã có trong `public/games/lenh-xoa/`, nên `npm install` và `npm run build`
không cần cài Godot, Python hay đăng nhập kho game. Vercel phục vụ các tệp này như
tài nguyên tĩnh. Gói dữ liệu được nén gzip và giải nén trong trình duyệt; `.wasm`
là engine, `.pck.gz` là dữ liệu game, `.html` là trang khởi động. Giữ cả thư mục.

Nguồn Godot tiếp tục nằm ở [Dingglebell/ktct-game](https://github.com/Dingglebell/ktct-game)
(kho riêng tư, cần quyền truy cập). Revision được ghi trong `runtime.json`.
Tài nguyên mua từ Fab không được đưa lên website dưới dạng file nguồn độc lập;
chỉ bản game đã đóng gói cùng các thông báo bản quyền được phân phối ở đây.

Để cập nhật game từ bản nguồn đầy đủ cùng Godot 4.7.2 và export templates tương ứng:

```text
npm run game:export -- --project "D:/Godot Projects/ktct-game" --godot "D:/Godot/Godot_v4.7.2-stable_win64.exe"
npm run game:check
npm run build
```

Có thể đặt `PYTHON_BIN`, `GODOT_PROJECT`, `GODOT_BIN` thay cho tham số.
Exporter tạo bản Web riêng với texture tối đa 1024px, Compatibility renderer,
GodotPhysics3D và single-thread; bản desktop giữ chất lượng và cấu hình cũ.
Bản Web có ánh sáng/hiệu ứng đơn giản hơn desktop. Không cần bật COOP/COEP toàn
website, nên nội dung và dịch vụ bên ngoài của nhóm vẫn dùng bình thường.
Game 3D dùng bảng xếp hạng riêng của nguồn Godot, tách khỏi bảng của trò chơi bốn
màn. Chưa có điều khiển cảm ứng cho bản 3D.
