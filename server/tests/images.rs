use reqwest::{Client, multipart};
use serde_json::json;

#[tokio::test]
async fn test_thumbnails() {
    let image_bytes: Vec<_> = (0..5).map(|index| std::fs::read(format!("tests/files/{index}.jpg")).unwrap())
        .collect();

    let json_data = json!({
        "title": "test",
        "price": 777,
        "payType": "rent",
        "category": "house",
    });

    let form = multipart::Form::new()
        .text("data", json_data.to_string());

    let form = image_bytes.into_iter().enumerate().fold(form, |form, (idx, image)| { 
        let part = multipart::Part::bytes(image)
            .file_name(format!("{idx}.jpg"))
            .mime_str("image/jpeg")
            .unwrap();
        form.part("images", part)
    });

    let client = Client::new();
    let res = client.post("http://localhost:3001/api/property")
        .multipart(form)
        .send()
        .await
        .unwrap();

    assert!(res.status().is_success());
}
