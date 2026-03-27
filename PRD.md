# Poll Bear - Product Requirements Document (MVP)

## Overview

Poll Bear is a web application for creating and voting in custom polls. Authenticated users can create polls, share them via links, and vote in other users' polls. Results are displayed as pie and bar charts.

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Fastify (Node.js)
- **Database:** MongoDB
- **Deployment:** cal.pl (dedicated server)
- **CI/CD:** GitHub Actions workflow — changes are deployed to the server immediately on push

## Authentication

- **Method:** Email + password
- **Session:** JWT with 1-hour expiration
  - _TODO (post-MVP): implement refresh tokens for longer sessions_
- **Registration:** Email + password, no username required
- Users are anonymous — no display names shown on polls

## Core Features

### Poll Creation

- Authenticated users can create a new poll with:
  - **Title** (required)
  - **Question** (required)
  - **Options** (2–10, required)
- New polls are automatically set to **open** status
- Creator can **add more options** after creation (no editing/removing existing ones)
- Creator can **close** a poll at any time (irreversible — closed polls cannot be reopened)
- Creator can **delete** a poll at any time

### Voting

- Only **authenticated users** can vote
- Each user can vote **once** per poll (single-choice)
- Voting is **anonymous** — no one can see who voted for what
- Votes can only be cast on **open** polls

### Results

- Displayed as:
  - **Pie chart**
  - **Bar chart** below with percentage values
- **Voters** see results immediately after voting
- **Poll creator** can see results at any time (even while poll is open)
- **Non-voters** cannot see results — they must vote first to view them

### Poll Discovery & Sharing

- Polls are discovered via **shareable link only** (no public feed or search)
- No browse/explore page for discovering other users' polls

### User Dashboard

- Authenticated users can browse:
  - **Their own polls** (created by them)
  - **Polls they voted in**

## Constraints

- Max 10 options per poll
- Single-choice voting only
- Scale: dozens to low hundreds of users (learning project)

## Out of Scope (Post-MVP)

- Multiple-choice voting
- Refresh tokens / extended sessions
- OAuth / magic link authentication
- Public poll feed / search
- Reopening closed polls
- Usernames / display names
- Real-time live-updating results
