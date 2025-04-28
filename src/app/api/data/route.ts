import { NextResponse } from 'next/server';

// Mock data for API endpoints
// In a real application, this would connect to your database

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dataType = url.searchParams.get('type');
  
  switch(dataType) {
    case 'properties':
      return NextResponse.json(mockProperties());
    case 'tenants':
      return NextResponse.json(mockTenants());
    case 'payments':
      return NextResponse.json(mockPayments());
    case 'expenses':
      return NextResponse.json(mockExpenses());
    case 'tasks':
      return NextResponse.json(mockTasks());
    default:
      return NextResponse.json({ error: 'Invalid data type requested' }, { status: 400 });
  }
}

// Mock data generators
function mockProperties() {
  const propertyTypes = ["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "LAND"];
  const statuses = ["ACTIVE", "INACTIVE", "MAINTENANCE", "LISTED_FOR_SALE", "LISTED_FOR_RENT"];
  
  return Array(5).fill(0).map((_, i) => ({
    id: i + 1,
    name: `Property ${i+1}`,
    address: `${100+i} Main St, City ${i+1}`,
    type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    size: Math.floor(Math.random() * 4200) + 800,
    yearBuilt: Math.floor(Math.random() * 43) + 1980,
    value: Math.floor(Math.random() * 1800000) + 200000
  }));
}

function mockTenants() {
  return Array(5).fill(0).map((_, i) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 335) - 30);
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 550) + 180);
    
    return {
      id: i + 1,
      userId: i + 10,
      facilityId: Math.floor(Math.random() * 5) + 1,
      leaseStart: startDate.toISOString(),
      leaseEnd: endDate.toISOString(),
      rentAmount: Math.floor(Math.random() * 2200) + 800,
      name: `Tenant ${i+1}`
    };
  });
}

function mockPayments() {
  const paymentMethods = ["CASH", "CHECK", "CREDIT_CARD", "BANK_TRANSFER", "PAYPAL"];
  const statuses = ["PENDING", "PAID", "FAILED", "REFUNDED"];
  
  return Array(5).fill(0).map((_, i) => {
    const paymentDate = new Date();
    paymentDate.setDate(paymentDate.getDate() - Math.floor(Math.random() * 90));
    
    return {
      id: i + 1,
      userId: Math.floor(Math.random() * 5) + 1,
      tenantId: Math.floor(Math.random() * 5) + 1,
      propertyId: Math.floor(Math.random() * 5) + 1,
      amount: Math.floor(Math.random() * 2200) + 800,
      currency: "USD",
      paymentDate: paymentDate.toISOString(),
      method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
  });
}

function mockExpenses() {
  const categories = ["RENT", "UTILITY", "MAINTENANCE", "CLEANING", "INSURANCE", "TAXES"];
  const statuses = ["DUE", "PENDING", "PAID", "PARTIALLY_PAID", "OVERDUE"];
  
  return Array(5).fill(0).map((_, i) => {
    const expenseDate = new Date();
    expenseDate.setDate(expenseDate.getDate() - Math.floor(Math.random() * 90));
    
    return {
      id: i + 1,
      userId: Math.floor(Math.random() * 5) + 1,
      propertyId: Math.floor(Math.random() * 5) + 1,
      amount: Math.floor(Math.random() * 1900) + 100,
      currency: "USD",
      category: categories[Math.floor(Math.random() * categories.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      expenseDate: expenseDate.toISOString(),
      description: `Expense ${i+1} description`
    };
  });
}

function mockTasks() {
  const statuses = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
  const categories = ["MAINTENANCE", "REPAIR", "CLEANING", "INSPECTION", "ADMINISTRATIVE"];
  const priorities = ["LOW", "MEDIUM", "HIGH"];
  
  return Array(5).fill(0).map((_, i) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30));
    
    return {
      id: i + 1,
      userId: Math.floor(Math.random() * 5) + 1,
      propertyId: Math.floor(Math.random() * 5) + 1,
      title: `Task ${i+1}`,
      description: `Description for task ${i+1}`,
      dueDate: dueDate.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)]
    };
  });
}