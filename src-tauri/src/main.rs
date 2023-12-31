// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

mod api;
mod util;

use tauri::Manager;
pub use util::*;
pub use api::{
    init, save_settings, download_template, load_templates, load_html_templates,
    upload_file, add_contact, del_contact, send_email, check_update, update_version,
    download_component,load_components,get_data_from_github,get_preview_html,
    download_json_from_github
};


fn main() {
    tauri::Builder::default()
        .invoke_handler(
            tauri::generate_handler![
                init,save_settings,download_template,load_templates,
                load_html_templates,upload_file,add_contact,del_contact,
                send_email,check_update,update_version,download_component,
                load_components,get_data_from_github,get_preview_html,
                download_json_from_github
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
