# hide-scrollbar-extension
Luồng dữ liệu
Lưu vào 2 bộ lưu trữ:

-   chrome.storage.local: dành cho các trang web ở browser
-   localStorage: dành cho các trang web là Chrome Apps
    (do ở Chrome Apps chrome.storage.local bị lỗi)

Content Script:
Inject CSS vào trang web, là:

-   App tìm trong localStorage
-   Web tìm trong chrome.storage.local

Thử xem khác key thì có bị conflict không

Mở popup:
\_ Hiện intro
