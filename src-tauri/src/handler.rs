use tauri::Manager;

#[tauri::command]
pub async fn todo_create_window(app: tauri::AppHandle) {
    let webview = app.get_webview_window("todo").unwrap_or_else(|| {
        tauri::WebviewWindowBuilder::new(&app, "todo", tauri::WebviewUrl::App("todo/index.html".into()))
            .title("Todo - DevTask~")
            .inner_size(300.0, 200.0)
            .always_on_top(true)
            .build()
            .unwrap()
    });

    let _ = webview.set_focus();
}
