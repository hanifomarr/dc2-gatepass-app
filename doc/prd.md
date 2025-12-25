# Admin Dashboard PRD

## 1. Overview
The Admin Dashboard for the DC2 Gatepass system acts as the central control hub for community management. It allows administrators to oversee houses, residents, visitors, and system users, ensuring secure and efficient community operations.

## 2. Core Features (MVP)

### 2.1 Login & Authentication
- **Secure Login**: Email/Password authentication for admins.
- **Session Management**: Secure session handling with auto-logout on inactivity.
- **Password Recovery**: Flow for resetting forgotten passwords.

### 2.2 House Management
- **List Houses**: View all property units in the community.
- **Add/Edit House**: Create new units or update details (e.g., Block, Unit Number, Owner info).
- **House Status**: Mark houses as Occupied, Vacant, or Under Renovation.

### 2.3 Resident Management
- **Resident Links**: Associate residents with specific houses.
- **Profile Management**: View and edit resident contact details and vehicle information.
- **Activation**: Approve or deactivate resident accounts.

### 2.4 Visitor Management
- **Visitor Logs**: Real-time logic of visitor entries and exits.
- **Pre-registration**: View visitors pre-registered by residents.
- **Search & Filter**: Find visitors by date, name, license plate, or house visited.

### 2.5 User Management (System Admins & Guards)
- **Manage Roles**: Create accounts for Staff (Admins, Security Guards).
- **Permissions**: Assign roles to limit access (e.g., Guards can scan but not delete residents).

## 3. Resident Portal (Phase 2)
Residents can log in to manage their visitors and payments.
- **Dashboard**: Quick view of active visitors and payment status.
- **Visitor Registration**: Form to pre-register visitors (Name, License Plate, Date, Purpose).
- **My Visitors**: List of past and upcoming visitors with status tracking.
- **Payments**: View monthly maintenance fees and simulate payments.

## 4. Suggested Improvements & Future Features

### 3.1 Analytics Dashboard
- **Visual Stats**: Graphs showing peak visitor hours, total daily entries, and active residents.
- **Occupancy Rate**: Visual breakdown of occupied vs vacant houses.

### 3.2 Security Enhancements
- **Blacklist Management**: Flag specific visitors or vehicles to deny entry automatically.
- **Audit Logs**: comprehensive log of all admin actions (e.g., "Admin X deleted Resident Y").

### 3.3 Communication Hub
- **Announcements**: Send push notifications or emails to all residents (e.g., "Water maintenance on Tuesday").
- **Incident Reporting**: Allow guards/residents to log security incidents directly to the dashboard.

### 3.4 Data Export
- **Reports**: Export visitor logs and incident reports to CSV/PDF for monthly reviews.

## 4. Technical Requirements
- **Frontend**: React (Vite) + Tailwind CSS + Shadcn UI (suggested for component library).
- **Backend Integration**: RESTful API or GraphQL (integration with `dc2-gatepass-be`).
- **Responsive Design**: Dashboard should be usable on tablets (for guards) and desktops.
