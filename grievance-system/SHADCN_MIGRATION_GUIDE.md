# shadcn/ui Migration Guide

## ✅ Completed Setup

### 1. Configuration Files Created
- `tailwind.config.js` - Tailwind CSS configuration with shadcn/ui theme
- `components.json` - shadcn/ui configuration
- `src/lib/utils.js` - Utility functions for className merging

### 2. CSS Updated
- `src/index.css` - Updated with Tailwind directives and CSS variables
- Removed Material-UI theme dependency

### 3. Core Components Created
- `src/components/ui/button.jsx` - Button component with variants
- `src/components/ui/card.jsx` - Card components (Card, CardHeader, CardContent, etc.)
- `src/components/ui/input.jsx` - Input component
- `src/components/ui/badge.jsx` - Badge component for status indicators
- `src/components/ui/select.jsx` - Select dropdown component
- `src/components/ui/textarea.jsx` - Textarea component
- `src/components/ui/label.jsx` - Label component

### 4. Dashboard Migrated
- `src/components/DashboardNew.jsx` - Fully migrated Dashboard component
- Updated `src/App.js` to use new Dashboard

## 🔄 Migration Mapping

### Material-UI → shadcn/ui Component Mapping

| Material-UI | shadcn/ui | Notes |
|-------------|-----------|-------|
| `Button` | `Button` | Similar API, use `variant` prop |
| `Card`, `CardContent` | `Card`, `CardContent` | Very similar structure |
| `Typography` | Native HTML + Tailwind | Use `<h1>`, `<p>` with Tailwind classes |
| `TextField` | `Input` + `Label` | Separate components |
| `Chip` | `Badge` | Similar functionality |
| `Container` | `<div className="container">` | Use Tailwind container |
| `Grid` | `<div className="grid">` | Use CSS Grid with Tailwind |
| `Box` | `<div>` | Use regular div with Tailwind |
| `Paper` | `Card` | Use Card component |
| `Avatar` | Custom div | Create with Tailwind classes |

### Icon Migration
- Material-UI Icons → Lucide React (already installed)
- Example: `<AddIcon />` → `<Plus className="h-4 w-4" />`

## 📝 Next Steps - Components to Migrate

### 1. Header Component
```jsx
// Replace Material-UI AppBar, Toolbar with:
<header className="border-b bg-background">
  <div className="container mx-auto px-4">
    {/* Header content */}
  </div>
</header>
```

### 2. InstitutionSelect Component
- Replace `Select` with shadcn/ui `Select`
- Replace `FormControl`, `InputLabel` with `Label`
- Use `Card` instead of `Paper`

### 3. StatusTracking Component
- Replace `DataGrid` or `Table` with custom table using Tailwind
- Use `Badge` for status indicators
- Replace `LinearProgress` with custom progress bar

### 4. AnonymousFeedback Component
- Replace `TextField` with `Input` and `Textarea`
- Use `Label` for form labels
- Replace `FormControl` with div containers

## 🎨 Styling Guidelines

### Color System
```jsx
// Primary colors
className="bg-primary text-primary-foreground"
className="text-primary"

// Status colors
className="text-green-600" // Success
className="text-red-600"   // Error
className="text-amber-600" // Warning
className="text-blue-600"  // Info
```

### Layout Classes
```jsx
// Container
className="container mx-auto px-4"

// Grid layouts
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"

// Flexbox
className="flex items-center justify-between"

// Spacing
className="space-y-4" // Vertical spacing
className="space-x-4" // Horizontal spacing
className="gap-4"     // Grid/flex gap
```

### Typography
```jsx
// Headings
<h1 className="text-3xl font-bold">
<h2 className="text-2xl font-semibold">
<h3 className="text-xl font-medium">

// Body text
<p className="text-muted-foreground">
<span className="text-sm text-muted-foreground">
```

## 🛠️ Installation Commands

```bash
# Already installed:
npm install tailwindcss-animate @radix-ui/react-slot @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install @radix-ui/react-separator @radix-ui/react-toast
npm install @radix-ui/react-tooltip @radix-ui/react-accordion
npm install @radix-ui/react-alert-dialog @radix-ui/react-avatar
npm install @radix-ui/react-checkbox @radix-ui/react-collapsible
npm install @radix-ui/react-context-menu @radix-ui/react-hover-card
npm install @radix-ui/react-label @radix-ui/react-menubar
npm install @radix-ui/react-navigation-menu @radix-ui/react-popover
npm install @radix-ui/react-progress @radix-ui/react-radio-group
npm install @radix-ui/react-scroll-area @radix-ui/react-switch
npm install @radix-ui/react-tabs @radix-ui/react-toggle
npm install @radix-ui/react-toggle-group

# Already have:
# class-variance-authority, clsx, lucide-react, tailwind-merge

# Removed:
# @mui/material @mui/icons-material @mui/lab @emotion/react @emotion/styled
```

## 📋 Migration Checklist

- [x] Setup Tailwind CSS configuration
- [x] Create shadcn/ui components
- [x] Migrate Dashboard component
- [x] Update App.js
- [ ] Migrate Header component
- [ ] Migrate InstitutionSelect component
- [ ] Migrate RoleSelect component
- [ ] Migrate StatusTracking component
- [ ] Migrate AnonymousFeedback component
- [ ] Migrate AdminDashboard component
- [ ] Migrate NotificationProvider component
- [ ] Migrate ChatbotWidget component
- [ ] Update AppContext if needed
- [ ] Test all functionality
- [ ] Remove old theme files

## 🎯 Benefits of Migration

1. **Smaller Bundle Size** - No Material-UI dependencies
2. **Better Performance** - Tailwind CSS is more efficient
3. **Modern Design** - shadcn/ui provides contemporary UI patterns
4. **Accessibility** - Built on Radix UI primitives
5. **Customization** - Easier to customize with Tailwind
6. **Developer Experience** - Better TypeScript support and documentation

## 🔗 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Lucide React Icons](https://lucide.dev/)