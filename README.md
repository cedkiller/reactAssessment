## Overview
A React application demonstrating user profile management with CRUD operations. Designed as an assessment test for React developers.

## Features
```
1. View list of users with avatar, name, and email
2. Add new users through a modal form
3. Edit existing user details
4. Delete users
5. Form validation with error messages
6. Responsive modal interactions
```

## Installation
```bash
1. Clone repository:
git clone [repository-url]

2. Install dependencies:
npm install

3. Start development server:
npm start
```

## Usage
1. **View Users**  
- Displays all users in a list format  
- Shows avatar, name, and email for each user  

2. **Add User**  
- Click "Add User" button to open modal  
- ```Required fields: Name and Email```  
- Validation shows errors for:  
  - Empty required fields  
  - Invalid email format  

3. **Edit User**  
- Click edit icon on user card  
- Modal opens with existing values  
- Same validation as Add User  

4. **Delete User**  
- Click delete icon on user card  
- Confirmation dialog before permanent deletion  

## Testing
```bash
npm test
```
- Uses React Testing Library  
- Covers:  
  - Component rendering  
  - User interactions  
  - Form validation  
  - CRUD operations  

## Contributing
1. Fork the repository  
2. Create feature branch:  
```git checkout -b feature/new-feature```  
3. Commit changes  
4. Push to branch  
5. Submit Pull Request  

**Requirements:**  
- Include test coverage for changes  
- Maintain existing code style  
- Update documentation when applicable 
