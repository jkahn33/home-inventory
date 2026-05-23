# home-inventory-back-end/main.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/api")
def read_root():
    return {"message": "Hello World"}

current_dir = os.path.dirname(os.path.abspath(__file__))
dist_path = os.path.abspath(os.path.join(current_dir, "..", "home-inventory-front-end", "dist"))

if os.path.exists(dist_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(dist_path, "assets")), name="assets")

    @app.get("/{catchall:path}")
    def serve_react_app(catchall: str):
        return FileResponse(os.path.join(dist_path, "index.html"))
else:
    print(f"⚠️ Warning: Frontend build folder not found at: {dist_path}")