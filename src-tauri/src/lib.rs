// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::Serialize;
use tauri::{PhysicalSize, Size};

#[tauri::command]
async fn set_fixed_window_size(
    window: tauri::Window,
    width: f64,
    height: f64,
) -> Result<(), String> {
    // Setting the size
    window
        .set_size(Size::Physical(PhysicalSize { 
            width: width as u32, 
            height: height as u32 
        }))
        .map_err(|e| format!("Size change error: {}", e))?;
    
    // Making the window immutable
    window
        .set_resizable(false)
        .map_err(|e| format!("Size lock error: {}", e))?;

    window
        .set_maximizable(false)
        .map_err(|e| format!("Maximizable lock error: {}", e))?;
    
    // Setting the minimum and maximum size to be the same
    window
        .set_min_size(Some(Size::Physical(PhysicalSize { 
            width: width as u32, 
            height: height as u32 
        })))
        .map_err(|e| format!("Error in setting the minimum size: {}", e))?;
    
    window
        .set_max_size(Some(Size::Physical(PhysicalSize { 
            width: width as u32, 
            height: height as u32 
        })))
        .map_err(|e| format!("Error setting the maximum size: {}", e))?;
    
    println!("Fixed size is set: {}x{}", width, height);
    Ok(())
}

#[tauri::command]
async fn set_window_size(
    window: tauri::Window,
    width: f64,
    height: f64,
) -> Result<(), String>{
    window
        .set_size(Size::Physical(PhysicalSize { 
            width: width as u32, 
            height: height as u32 
        }))
        .map_err(|e| format!("Size change error: {}", e))?;
    println!("Size is set: {}x{}", width, height);
    Ok(())
}

#[tauri::command]
async fn make_window_resizable(window: tauri::Window) -> Result<(), String> {
    window
        .set_resizable(true)
        .map_err(|e| format!("Size unblocking error: {}", e))?;

    println!("The window is now resizable");
    Ok(())
}

#[derive(Serialize)]
pub struct WindowSize {
    pub width: f64,
    pub height: f64,
}

#[tauri::command]
async fn get_window_size(window: tauri::Window) -> Result<WindowSize, String> {
    let size = window
        .inner_size()
        .map_err(|e| format!("Error getting the size: {}", e))?;
    
    Ok(WindowSize {
        width: size.width as f64,
        height: size.height as f64,
    })
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            set_fixed_window_size,
            make_window_resizable,
            set_window_size,
            get_window_size,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
