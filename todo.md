# Poll Bear - MVP Implementation Plan

## Phase 1: Database & Auth (backend)

### ~~1. MongoDB setup~~ ✅
~~Connect Mongoose to MongoDB in the Fastify server. Create a reusable plugin that registers the connection on app startup. Define the User schema (email, hashed password, createdAt). Add environment variable handling for the connection string.~~

### 2. Auth routes
Implement `POST /auth/register` and `POST /auth/login` endpoints. Hash passwords with bcrypt on registration. On login, verify credentials and return a signed JWT (1-hour expiry). Create a Fastify auth middleware (decorator/hook) that verifies the JWT and attaches the user to the request. Protect all non-auth routes behind this middleware.

### 3. Test auth
Write integration tests covering: successful registration, duplicate email rejection, successful login, invalid credentials, accessing protected routes without a token, and expired token handling.

## Phase 2: Poll API (backend)

### 4. Poll & Vote schemas
Define Mongoose models for Poll (title, question, options array, creatorId, status: open/closed, createdAt) and Vote (pollId, optionIndex, oderId, createdAt). Add indexes for efficient querying (e.g. oderId + pollId unique compound index to enforce one vote per user).

### 5. Poll CRUD routes
Implement poll management endpoints:
- `POST /polls` — create a new poll (validate 2–10 options, set status to open)
- `GET /polls/:id` — get poll details (public info, no results unless authorized)
- `PATCH /polls/:id/close` — close a poll (creator only, irreversible)
- `DELETE /polls/:id` — delete a poll and its votes (creator only)
- `POST /polls/:id/options` — add new options to an open poll (creator only, respect 10-option max)

### 6. Voting route
Implement `POST /polls/:id/vote` endpoint. Validate that the poll is open, the user hasn't already voted, and the selected option index is valid. Store the vote with the oderId (for uniqueness enforcement) but don't expose voter identity in any response.

### 7. Results route
Implement `GET /polls/:id/results` endpoint. Return aggregated vote counts per option with percentages. Enforce visibility rules: the poll creator can always see results; other users can only see results after they've voted. Return 403 if the user hasn't voted and isn't the creator.

### 8. Test polls
Write integration tests covering: poll creation with valid/invalid data, adding options, closing a poll, deleting a poll, voting, duplicate vote rejection, results visibility for creator vs voter vs non-voter, and voting on a closed poll.

## Phase 3: Client foundation

### 9. Routing
Set up React Router with route structure: `/login`, `/register`, `/dashboard`, `/polls/new`, `/polls/:id`. Add a protected route wrapper that redirects unauthenticated users to login. Add a layout component with basic navigation.

### 10. API layer
Create an HTTP client (fetch or axios) configured with the base API URL. Add an interceptor/wrapper that attaches the JWT from localStorage to every request. Handle 401 responses by clearing the token and redirecting to login.

### 11. Auth pages
Build login and register forms with email/password fields, validation, and error display. On success, store the JWT and redirect to the dashboard.

## Phase 4: Poll UI

### 12. Dashboard
Build the main authenticated landing page with two sections: "My Polls" (polls the user created) and "Voted Polls" (polls the user has voted in). Each poll entry shows the title, status (open/closed), and links to the poll view. Add a prominent "Create Poll" button.

### 13. Create poll page
Build a form with fields for title, question, and a dynamic list of option inputs (start with 2, allow adding up to 10). Validate all fields client-side before submission. On success, redirect to the new poll's view page.

### 14. Poll view page
Display poll title, question, and options. Show different UI states based on context:
- **Open + not voted:** voting form with radio buttons and submit
- **Open + already voted (or creator):** results charts + share link
- **Closed:** results charts for anyone who voted or the creator
- **Creator controls:** close poll button, delete poll button, add option form (if open and under 10 options)
Include a copy-to-clipboard share link button.

### 15. Results charts
Integrate a charting library (e.g. Chart.js via react-chartjs-2 or Recharts). Render a pie chart showing vote distribution and a bar chart below it with percentage labels on each bar. Handle edge case of zero votes gracefully.

## Phase 5: Deploy

### 16. GitHub Actions workflow
Set up a CI/CD pipeline that triggers on push to `master`. Steps: install dependencies, build both client and server, deploy built artifacts to the cal.pl server (via SSH/SCP or rsync). Add environment secrets for server credentials and MongoDB connection string.
