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

Sau khi hoàn thành Màn 4, game lưu thời gian hoàn thành và tải bảng xếp hạng dùng chung (tối đa 100 người chơi). Mỗi tên chỉ có một kết quả; nhập lại cùng tên (không phân biệt chữ hoa/thường) sẽ thay thời gian cũ bằng thời gian của lượt mới và cập nhật thứ hạng. Nếu bảng hiện có nhiều dòng trùng tên, schema giữ lại kết quả nhanh nhất trong lần nâng cấp.

Chỉ dùng anon/public key ở frontend; không đưa service-role key vào file `.env` của ứng dụng web. Vì người chơi chưa cần đăng nhập, người chơi có thể mạo danh tên khác và kết quả không có cơ chế chống gian lận.


## Latest interaction update

- The homepage hero is now a full-viewport photographic scene pinned during scroll.
- The first content panel slides upward over the hero, physically covering the image.
- Reversing the scroll moves the panel back down so the hero photo is progressively revealed again.
- Hero scale, tint and copy shift are scroll-driven.
- Route changes reset the viewport to the top via a pathname-aware scroll-to-top effect.
- The hero image is from Wikimedia Commons and is licensed CC BY-SA 4.0; see IMAGE-CREDITS.md.
