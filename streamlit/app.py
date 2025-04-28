import streamlit as st
import pandas as pd
import numpy as np
import json
import os
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import altair as alt

# Set page configuration
st.set_page_config(
    page_title="Real Estate Management Dashboard",
    page_icon="🏢",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Sidebar navigation
st.sidebar.title("Navigation")
page = st.sidebar.radio(
    "Select a page",
    ["Overview", "Properties", "Tenants", "Financial", "Occupancy", "Maintenance"]
)

# Mock data generation functions
def generate_mock_properties():
    property_types = ["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "LAND"]
    statuses = ["ACTIVE", "INACTIVE", "MAINTENANCE", "LISTED_FOR_SALE", "LISTED_FOR_RENT"]
    
    data = []
    for i in range(5):
        data.append({
            "id": i + 1,
            "name": f"Property {i+1}",
            "address": f"{100+i} Main St, City {i+1}",
            "type": np.random.choice(property_types),
            "status": np.random.choice(statuses),
            "size": np.random.randint(800, 5000),
            "yearBuilt": np.random.randint(1980, 2023),
            "value": np.random.randint(200000, 2000000)
        })
    return pd.DataFrame(data)

def generate_mock_tenants():
    data = []
    for i in range(5):
        start_date = datetime.now() - timedelta(days=np.random.randint(30, 365))
        end_date = start_date + timedelta(days=np.random.randint(180, 730))
        data.append({
            "id": i + 1,
            "userId": i + 10,
            "facilityId": np.random.randint(1, 6),
            "leaseStart": start_date,
            "leaseEnd": end_date,
            "rentAmount": np.random.randint(800, 3000),
            "name": f"Tenant {i+1}"
        })
    return pd.DataFrame(data)

def generate_mock_payments():
    payment_methods = ["CASH", "CHECK", "CREDIT_CARD", "BANK_TRANSFER", "PAYPAL"]
    statuses = ["PENDING", "PAID", "FAILED", "REFUNDED"]
    
    data = []
    for i in range(5):
        payment_date = datetime.now() - timedelta(days=np.random.randint(1, 90))
        data.append({
            "id": i + 1,
            "userId": np.random.randint(1, 6),
            "tenantId": np.random.randint(1, 6),
            "propertyId": np.random.randint(1, 6),
            "amount": np.random.randint(800, 3000),
            "currency": "USD",
            "paymentDate": payment_date,
            "method": np.random.choice(payment_methods),
            "status": np.random.choice(statuses)
        })
    return pd.DataFrame(data)

def generate_mock_expenses():
    categories = ["RENT", "UTILITY", "MAINTENANCE", "CLEANING", "INSURANCE", "TAXES"]
    statuses = ["DUE", "PENDING", "PAID", "PARTIALLY_PAID", "OVERDUE"]
    
    data = []
    for i in range(5):
        expense_date = datetime.now() - timedelta(days=np.random.randint(1, 90))
        data.append({
            "id": i + 1,
            "userId": np.random.randint(1, 6),
            "propertyId": np.random.randint(1, 6),
            "amount": np.random.randint(100, 2000),
            "currency": "USD",
            "category": np.random.choice(categories),
            "status": np.random.choice(statuses),
            "expenseDate": expense_date,
            "description": f"Expense {i+1} description"
        })
    return pd.DataFrame(data)

def generate_mock_tasks():
    statuses = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
    categories = ["MAINTENANCE", "REPAIR", "CLEANING", "INSPECTION", "ADMINISTRATIVE"]
    priorities = ["LOW", "MEDIUM", "HIGH"]
    
    data = []
    for i in range(5):
        due_date = datetime.now() + timedelta(days=np.random.randint(1, 30))
        data.append({
            "id": i + 1,
            "userId": np.random.randint(1, 6),
            "propertyId": np.random.randint(1, 6),
            "title": f"Task {i+1}",
            "description": f"Description for task {i+1}",
            "dueDate": due_date,
            "status": np.random.choice(statuses),
            "category": np.random.choice(categories),
            "priority": np.random.choice(priorities)
        })
    return pd.DataFrame(data)

# Load mock data
@st.cache_data
def load_data():
    properties = generate_mock_properties()
    tenants = generate_mock_tenants()
    payments = generate_mock_payments()
    expenses = generate_mock_expenses()
    tasks = generate_mock_tasks()
    
    return properties, tenants, payments, expenses, tasks

properties, tenants, payments, expenses, tasks = load_data()

# Overview Page
if page == "Overview":
    st.title("Real Estate Management Dashboard")
    
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(label="Total Properties", value=len(properties))
    
    with col2:
        active_properties = len(properties[properties['status'] == 'ACTIVE'])
        st.metric(label="Active Properties", value=active_properties)
    
    with col3:
        total_tenants = len(tenants)
        st.metric(label="Total Tenants", value=total_tenants)
    
    with col4:
        total_value = properties['value'].sum()
        st.metric(label="Total Property Value", value=f"${total_value:,.2f}")
    
    # Property distribution by type
    st.subheader("Property Distribution by Type")
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.countplot(data=properties, x='type', ax=ax)
    plt.xticks(rotation=45)
    st.pyplot(fig)
    
    # Property status distribution
    st.subheader("Property Status Distribution")
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.countplot(data=properties, x='status', ax=ax)
    plt.xticks(rotation=45)
    st.pyplot(fig)
    
    # Recent payments
    st.subheader("Recent Payments")
    st.dataframe(payments.sort_values('paymentDate', ascending=False).head())
    
    # Recent tasks
    st.subheader("Recent Tasks")
    st.dataframe(tasks.sort_values('dueDate').head())

# Properties Page
elif page == "Properties":
    st.title("Property Analysis")
    
    # Property filters
    st.sidebar.subheader("Property Filters")
    property_type = st.sidebar.multiselect(
        "Property Type",
        options=properties['type'].unique(),
        default=properties['type'].unique()
    )
    
    property_status = st.sidebar.multiselect(
        "Property Status",
        options=properties['status'].unique(),
        default=properties['status'].unique()
    )
    
    # Filter properties
    filtered_properties = properties[
        (properties['type'].isin(property_type)) &
        (properties['status'].isin(property_status))
    ]
    
    # Property details
    st.subheader("Property Details")
    st.dataframe(filtered_properties)
    
    # Property age distribution
    st.subheader("Property Age Distribution")
    current_year = datetime.now().year
    filtered_properties['age'] = current_year - filtered_properties['yearBuilt']
    
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.histplot(data=filtered_properties, x='age', bins=10, ax=ax)
    plt.xlabel("Age (years)")
    st.pyplot(fig)
    
    # Property size vs value
    st.subheader("Property Size vs Value")
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.scatterplot(data=filtered_properties, x='size', y='value', hue='type', ax=ax)
    plt.xlabel("Size (sq ft)")
    plt.ylabel("Value ($)")
    st.pyplot(fig)

# Tenants Page
elif page == "Tenants":
    st.title("Tenant Analysis")
    
    # Lease expiration timeline
    st.subheader("Lease Expiration Timeline")
    
    # Convert dates to datetime if they're not already
    if not pd.api.types.is_datetime64_any_dtype(tenants['leaseEnd']):
        tenants['leaseEnd'] = pd.to_datetime(tenants['leaseEnd'])
    
    # Create a chart for lease expiration
    lease_chart = alt.Chart(tenants).mark_bar().encode(
        x=alt.X('yearmonth(leaseEnd):T', title='Lease End Date'),
        y=alt.Y('count()', title='Number of Leases Expiring'),
        tooltip=['count()', 'yearmonth(leaseEnd):T']
    ).properties(
        width=700,
        height=400,
        title='Lease Expiration Timeline'
    )
    
    st.altair_chart(lease_chart, use_container_width=True)
    
    # Rent distribution
    st.subheader("Rent Amount Distribution")
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.histplot(data=tenants, x='rentAmount', bins=10, ax=ax)
    plt.xlabel("Monthly Rent ($)")
    st.pyplot(fig)
    
    # Tenant details
    st.subheader("Tenant Details")
    st.dataframe(tenants)

# Financial Page
elif page == "Financial":
    st.title("Financial Analysis")
    
    # Time period filter
    st.sidebar.subheader("Time Period")
    days_filter = st.sidebar.slider("Last N days", 7, 365, 90)
    
    # Filter data by time period
    cutoff_date = datetime.now() - timedelta(days=days_filter)
    
    filtered_payments = payments[payments['paymentDate'] >= cutoff_date]
    filtered_expenses = expenses[expenses['expenseDate'] >= cutoff_date]
    
    # Financial summary
    col1, col2, col3 = st.columns(3)
    
    with col1:
        total_income = filtered_payments['amount'].sum()
        st.metric(label="Total Income", value=f"${total_income:,.2f}")
    
    with col2:
        total_expenses = filtered_expenses['amount'].sum()
        st.metric(label="Total Expenses", value=f"${total_expenses:,.2f}")
    
    with col3:
        net_income = total_income - total_expenses
        st.metric(label="Net Income", value=f"${net_income:,.2f}")
    
    # Income vs Expenses
    st.subheader("Income vs Expenses")
    
    # Prepare data for chart
    income_data = filtered_payments.groupby(pd.Grouper(key='paymentDate', freq='M')).sum(numeric_only=True).reset_index()
    expense_data = filtered_expenses.groupby(pd.Grouper(key='expenseDate', freq='M')).sum(numeric_only=True).reset_index()
    
    income_data['date'] = income_data['paymentDate'].dt.strftime('%Y-%m')
    income_data['type'] = 'Income'
    income_data = income_data.rename(columns={'paymentDate': 'date_original'})
    
    expense_data['date'] = expense_data['expenseDate'].dt.strftime('%Y-%m')
    expense_data['type'] = 'Expense'
    expense_data = expense_data.rename(columns={'expenseDate': 'date_original'})
    
    financial_data = pd.concat([
        income_data[['date', 'amount', 'type']],
        expense_data[['date', 'amount', 'type']]
    ])
    
    # Create chart
    chart = alt.Chart(financial_data).mark_bar().encode(
        x='date:N',
        y='amount:Q',
        color='type:N',
        tooltip=['date', 'amount', 'type']
    ).properties(
        width=700,
        height=400
    )
    
    st.altair_chart(chart, use_container_width=True)
    
    # Expense breakdown by category
    st.subheader("Expense Breakdown by Category")
    fig, ax = plt.subplots(figsize=(10, 6))
    expense_by_category = filtered_expenses.groupby('category')['amount'].sum().reset_index()
    sns.barplot(data=expense_by_category, x='category', y='amount', ax=ax)
    plt.xticks(rotation=45)
    plt.ylabel("Amount ($)")
    st.pyplot(fig)
    
    # Payment status distribution
    st.subheader("Payment Status Distribution")
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.countplot(data=filtered_payments, x='status', ax=ax)
    plt.xticks(rotation=45)
    st.pyplot(fig)

# Occupancy Page
elif page == "Occupancy":
    st.title("Occupancy Analysis")
    
    # Calculate occupancy rate (mock data)
    occupancy_data = pd.DataFrame({
        'month': pd.date_range(start='2023-01-01', periods=12, freq='M'),
        'occupancy_rate': np.random.uniform(0.7, 0.95, 12)
    })
    
    # Occupancy rate over time
    st.subheader("Occupancy Rate Over Time")
    
    chart = alt.Chart(occupancy_data).mark_line(point=True).encode(
        x=alt.X('yearmonth(month):T', title='Month'),
        y=alt.Y('occupancy_rate:Q', title='Occupancy Rate', scale=alt.Scale(domain=[0, 1])),
        tooltip=['yearmonth(month):T', alt.Tooltip('occupancy_rate:Q', format='.1%')]
    ).properties(
        width=700,
        height=400
    )
    
    st.altair_chart(chart, use_container_width=True)
    
    # Occupancy by property type (mock data)
    st.subheader("Occupancy by Property Type")
    
    property_occupancy = pd.DataFrame({
        'type': properties['type'].unique(),
        'occupancy_rate': np.random.uniform(0.6, 0.95, len(properties['type'].unique()))
    })
    
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.barplot(data=property_occupancy, x='type', y='occupancy_rate', ax=ax)
    plt.ylabel("Occupancy Rate")
    plt.ylim(0, 1)
    st.pyplot(fig)

# Maintenance Page
elif page == "Maintenance":
    st.title("Maintenance Analysis")
    
    # Task status distribution
    st.subheader("Task Status Distribution")
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.countplot(data=tasks, x='status', ax=ax)
    plt.xticks(rotation=45)
    st.pyplot(fig)
    
    # Task category distribution
    st.subheader("Task Category Distribution")
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.countplot(data=tasks, x='category', ax=ax)
    plt.xticks(rotation=45)
    st.pyplot(fig)
    
    # Task priority distribution
    st.subheader("Task Priority Distribution")
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.countplot(data=tasks, x='priority', ax=ax)
    plt.xticks(rotation=45)
    st.pyplot(fig)
    
    # Tasks by property
    st.subheader("Tasks by Property")
    tasks_by_property = tasks.groupby('propertyId').size().reset_index(name='count')
    tasks_by_property = tasks_by_property.merge(properties[['id', 'name']], left_on='propertyId', right_on='id')
    
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.barplot(data=tasks_by_property, x='name', y='count', ax=ax)
    plt.xticks(rotation=45)
    plt.xlabel("Property")
    plt.ylabel("Number of Tasks")
    st.pyplot(fig)
    
    # Task details
    st.subheader("Task Details")
    st.dataframe(tasks)