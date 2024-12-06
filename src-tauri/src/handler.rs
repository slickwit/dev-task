#[tauri::command]
pub fn init_files(files: Vec<i32>) {
    println!("{:?}", files);
}
