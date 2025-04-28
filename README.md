# Real Estate Management System with Streamlit Data Visualization

This project combines a Next.js frontend with a Streamlit data visualization dashboard for comprehensive real estate management.

## Features

- **Next.js Frontend**: Modern web interface for property management
- **Streamlit Dashboard**: Data visualization and analytics for real estate data
- **Mock API**: Simulated data endpoints for development and testing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+ (for Streamlit)

### Installation

1. Clone the repository
2. Install JavaScript dependencies:
   ```
   npm install
   ```
3. Install Python dependencies:
   ```
   cd streamlit
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the Next.js development server:
   ```
   npm run dev
   ```
   This will start the Next.js app on http://localhost:8080

2. In a separate terminal, start the Streamlit server:
   ```
   cd streamlit
   streamlit run app.py
   ```
   This will start the Streamlit dashboard on http://localhost:8501

## Project Structure

- `/src` - Next.js frontend application
- `/streamlit` - Streamlit data visualization dashboard
- `/src/app/api` - Mock API endpoints for development

## Data Visualization Features

The Streamlit dashboard provides visualizations for:

- Property overview and distribution
- Tenant analysis and lease expiration
- Financial analysis (income vs expenses)
- Occupancy trends
- Maintenance task analysis

## Technologies Used

- Next.js 15
- React 19
- Streamlit
- Pandas
- Matplotlib
- Seaborn
- Altair