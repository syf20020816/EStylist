// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

mod api;
mod util;

pub use util::*;
pub use api::{init,save_settings,download_template,load_templates,load_html_templates,upload_file,add_contact};


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![init,save_settings,download_template,load_templates,load_html_templates,upload_file,add_contact])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
