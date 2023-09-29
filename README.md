# Hide Scrollbar Extension

## Một Số Tính Năng

-   Tắt/Bật thanh cuộn bằng cách bấm vào icon Extension
-   Tắt/Bật thanh cuộn trong Context Menu (chuột phải)
-   Thông tin liên hệ

## Cách Cài Đặt

1. Tải mã nguồn: Truy cập trang GitHub https://github.com/michino25/hide-scrollbar-extension, nhấp vào nút <> Code (màu xanh lá) và chọn Download ZIP.
2. Giải Nén Tệp ZIP: Sau khi tải xuống, giải nén tệp ZIP để truy cập các tệp và thư mục bên trong.
3. Truy Cập Trang Chrome Extension: Mở trình duyệt Google Chrome và truy cập vào chrome://extensions/.
4. Bật Chế Độ Nhà Phát triển: Ở góc trên bên phải của trang quản lý tiện ích mở rộng, bật "Chế độ Nhà phát triển" (Developer Mode).
5. Cài đặt Tiện Ích Mở Rộng: Sau khi bật chế độ nhà phát triển, một số tùy chọn mới xuất hiện. Chọn tùy chọn "Tải tiện ích mở rộng không rõ nguồn gốc" (Load unpacked) và chọn thư mục đã giải nén ở bước 2.
6. Cài đặt thành công, sử dụng nào!

## Ghi Chú

-   Lưu vào chrome.storage.local
-   Content Script cho trang web loading
-   Inject script style vào trang web khi web đã load xong >> giảm độ trễ
-   Mở popup Hiện intro
-   Có context menu
-   Fix bug chrome:// (chỉ cho chạy ở https và http)
-   About me dẫn link github
