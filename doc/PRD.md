# Product Requirements Document (PRD) - DC2 Gatepass Admin Dashboard

## 1. Overview
The **DC2 Gatepass Admin Dashboard** is a web-based interface for administrators to manage the gatepass system. It allows management of houses, residents, visitors, and system users.

## 2. Goals & Objectives
- **Centralized Management**: Provide a single point of control for all gatepass related data.
- **User Friendly**: Simple and intuitive UI for security personnel and admins.
- **MVP Focus**: Implement core CRUD functionalities first.

## 3. Tech Stack
- **Frontend Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + DaisyUI (Pre-installed)
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Forms**: TanStack Form + Zod (Validation)
- **Tables**: TanStack Table (Data Grids)
- **Icons**: Lucide React (Suggested)
- **HTTP Client**: Axios (Suggested)

## 4. Feature Requirements

### 4.1 Authentication
- **Login Page**:
  - Fields: Username/Email, Password
  - Validation: Required fields
  - Action: Authenticate against Backend
  - Output: JWT Token (stored in localStorage/cookie)
- **Access Control**:
  - Protected Routes (Redirect to login if unauthorized)

### 4.2 Dashboard Overview (MVP Addition)
- **Stats Widgets**:
  - Total Residents
  - Total Visitors Today
  - Active Guards
- **Recent Activity Feed**:
  - Latest check-ins/check-outs

### 4.3 House Management
- **List View**: Table showing Block, Street, Unit Number, Occupancy Status.
- **Add/Edit House**: Form to create or update house details.
- **Delete House**: Soft/Hard delete confirmation.

### 4.4 Resident Management
- **List View**: Table showing Name, Contact, Assigned House.
- **Add/Edit Resident**: Form to link resident to a house.
- **Delete Resident**: Remove resident access.

### 4.5 Visitor Management
- **List View**: History of visitors (Name, Entry Time, Exit Time, Status, Host).
- **Manual Entry**: Admin capability to log a visitor manually (if needed for MVP).
- **Search/Filter**: By Date, House, or Visitor Name.

### 4.6 User Management (Admin & Guards)
- **List View**: List of system users (Admins, Guards).
- **Role Management**: Assign roles (Admin, Guard).
- **Create/Edit User**: Manage credentials and roles.

## 5. UI/UX Suggestions (MVP)
- **Layout**: Sidebar navigation (collapsible), Top header with User Profile menu.
- **Theme**: Clean, professional look using DaisyUI components (Drawers, Modals, Tables).
- **Feedback**: Toast notifications for success/error actions.
- **Loading States**: Skeletons for table loading.

## 6. Future Considerations (Post-MVP)
- Report Generation (PDF/CSV)
- Audit Logs
- Bulk Import/Export
- Dark Mode Toggle
