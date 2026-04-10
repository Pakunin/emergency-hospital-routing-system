# AI Emergency Hospital Routing System
A full-stack application leveraging mathematical graph traversal (BFS / UCS) to optimize emergency ambulance routing based on static parameters and dynamic traffic simulations.

## Tech Stack
-   **Frontend:** React, Vite, Tailwind CSS, React-Leaflet
-   **Backend:** Python, Flask, Flask-CORS
-   **Database:** Supabase (PostgreSQL)

## Supabase Setup (Prerequisite)

1.  Create a free project on [Supabase](https://supabase.com).
2.  Go to the **SQL Editor** in your Supabase dashboard and run the schema queries provided in the schemas document.
3.  Go to **Project Settings > API** to collect your keys:
    -   Project URL
    -   anon public key
    -   service_role key

## Backend Setup

Open a terminal and navigate to the backend directory:
```bash
cd backend
```
1.  **Create `.env` file**:
    For Windows:
    ```bash
    copy backend.env.example backend.env
    ```
    For Mac/Linux:
    ```bash
    cp backend/.env.example backend/.env
    ```
    Replace placeholders in `backend/.env` with your actual Supabase URL and service_role key.
    ```env
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    FLASK_ENV=development
    FLASK_PORT=5000
    ```
2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Seed Database:**
    Populate the Supabase database with dummy hospitals, junctions, and roads.
    ```bash
    python seed/seed_data.py
    ```
4.  **Run API Server:**
    ```bash
    python run.py
    ```

## Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```
1.   **Create `.env` file**:
    For Windows:
    ```bash
    copy frontend.env.example frontend.env
    ```
    For Mac/Linux:
    ```bash
    cp frontend/.env.example frontend/.env
    ```
    Replace placeholders in `frontend/.env` with your Supabase URL and anon public key.
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_BACKEND_URL=http://localhost:5000
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
Visit `http://localhost:5173` in your browser.

## 🧠 Algorithms
*   **Breadth-First Search (BFS):** Utilizes a Queue traversal. Employs node hopping calculation to determine the closest hospital purely by the physical number of intersections.
*   **Uniform Cost Search (UCS):** Utilizes a Priority Queue (Min-Heap). Determines absolute optimal timing by continuously multiplying base road distance by dynamically updated traffic flow multipliers.
