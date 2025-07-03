import pydicom
import numpy as np
from torchvision import transforms, models
from PIL import Image
import io
import torch

# Define the transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# Load model
def get_model():
    model = models.densenet121(pretrained=False)
    model.features.conv0 = torch.nn.Conv2d(1, 64, kernel_size=7, stride=2, padding=3, bias=False)
    model.classifier = torch.nn.Linear(1024, 6)  # 6 classes
    model.load_state_dict(torch.load("model/ICH_DENSENET121.pth", map_location=torch.device('cpu')))
    model.eval()
    return model

model = get_model()

def predict_image(image_bytes, content_type=None):
    try:
        image = None
        try:
            # Try loading as DICOM
            ds = pydicom.dcmread(io.BytesIO(image_bytes))
            image_array = ds.pixel_array.astype(np.float32)
            image_array -= image_array.min()
            image_array /= image_array.max()
            image_array *= 255.0
            image_array = image_array.astype(np.uint8)
            image = Image.fromarray(image_array).convert("L")
        except Exception:
            # Fallback: Try regular image (e.g., PNG, JPG)
            image = Image.open(io.BytesIO(image_bytes)).convert("L")

        if image is None:
            raise ValueError("Image conversion failed.")
        
    except Exception as e:
        raise ValueError(f"Unsupported or corrupted image file: {e}")

    # Transform and predict
    tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        output = model(tensor)
        _, predicted = torch.max(output, 1)

    labels = [
        "No hemorrhage",        # 0
        "Epidural",             # 1
        "Intraparenchymal",     # 2
        "Intraventricular",     # 3
        "Subarachnoid",         # 4
        "Subdural"              # 5
    ]
    
    index = predicted.item()
    return {
        "class_label": labels[index]
    }
