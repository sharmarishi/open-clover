# open-clover

## What This Is

A full-featured Clover POS restaurant management portal covering all core operations and intelligence layers: hardware device management, payments (cards, NFC, QR, Apple/Google Pay), order management (table mapping, tableside ordering, bill splits, KDS), menu management (real-time editor, modifiers, day parts), food delivery integrations (DoorDash, Uber Eats, Deliverect), ERP & accounting (QuickBooks, Xero, payroll), inventory tracking, and analytics.

## Core Value

Restaurant operators can manage every aspect of their POS — payments, orders, menu, delivery, inventory, and analytics — from a single unified portal.

## Current State

| Attribute | Value |
|-----------|-------|
| Version | 0.0.0 |
| Status | Prototype |
| Last Updated | 2026-03-24 |

## Requirements

### Must Have
- [ ] Hardware device dashboard (Station Duo, Clover Mini, Flex, Kitchen Display)
- [ ] Payments module (cards, NFC/contactless, Apple & Google Pay, QR codes)
- [ ] Order management (table mapping, tableside ordering, bill split & tabs, KDS integration)
- [ ] Menu management (real-time editor, modifiers & variants, day parts & events, multi-channel sync)
- [ ] Food delivery integrations UI (DoorDash, Uber Eats, Stream middleware, Deliverect/Chowly)
- [ ] ERP & accounting panel (QuickBooks, Xero, API middleware, payroll & labor)
- [ ] Inventory tracking (ingredient tracking, auto-deduct orders, out-of-stock alerts)
- [ ] Analytics dashboard (sales trend reports, menu performance, peak time insights)

### Should Have
- [ ] Responsive layout for tablet/desktop
- [ ] Navigation sidebar with section routing
- [ ] Mock data and realistic UI states

### Nice to Have
- [ ] Dark mode
- [ ] Animated transitions

### Out of Scope
- Real payment processing — mock UI only
- Actual third-party API connections

## Target Users

**Primary:** Restaurant owners and operators using Clover POS
- Need unified visibility across all restaurant operations
- Manage front-of-house and back-of-house workflows

## Constraints

### Technical Constraints
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS for styling
- No backend required (mock data)

## Success Criteria
- All 8 capability sections visible and navigable
- Each section shows relevant sub-features with realistic UI

---
*Created: 2026-03-24T11:33:18Z*
