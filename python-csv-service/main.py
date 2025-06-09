from fastapi import FastAPI, UploadFile, File
import pandas as pd
import os
import uvicorn

app = FastAPI()

@app.post("/process-csv/")
async def process_csv(file: UploadFile = File(...)):
    file_location = f"uploads/{file.filename}"
    with open(file_location, "wb+") as f:
        f.write(await file.read())

    try:
        df = pd.read_csv(file_location)
        row_count = len(df)
        first_rows = df.head(3).to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}

    return {
        "filename": file.filename,
        "row_count": row_count,
        "sample_data": first_rows
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)