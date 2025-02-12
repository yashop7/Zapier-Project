# Floley
<img width="1003" alt="Screenshot 2025-02-12 at 6 23 01 PM" src="https://github.com/user-attachments/assets/78ca724b-919a-4bf2-82e2-332c025e428f" />

<img width="1120" alt="Screenshot 2025-02-12 at 6 47 42 PM" src="https://github.com/user-attachments/assets/7ad5748c-251d-4693-bb52-7d1ea7830462" />
<img width="1119" alt="Screenshot 2025-02-12 at 6 49 01 PM" src="https://github.com/user-attachments/assets/82da8c93-ea94-472f-8356-e30dae01d2dc" />

Floley is an automation platform similar to Zapier, allowing users to set up triggers and actions to automate tasks such as sending emails and transferring Solana tokens. It provides a seamless way to integrate different services and execute workflows based on event-driven architecture.

## Features
- **Triggers:** Define events that initiate workflows (e.g., GitHub webhook events, database changes, API calls).
- **Actions:** Execute tasks in response to triggers (e.g., send emails, transfer Solana tokens).
- **Event Processing:** Uses Kafka for message queuing and distributed event processing.
- **Scalability:** Backend architecture supports multiple workers for handling automation at scale.

## Architecture Overview
- **Frontend (FE):** UI for users to create and manage "Zaps" (workflows with triggers and actions).
- **Backend (BE):** API layer handling requests from the frontend and interacting with the database.
- **Database (DB):** Stores triggers, actions, and event logs.
- **Kafka:** Message broker to handle event-driven workflows.
- **Workers:** Process queued events and execute corresponding actions.
- **Processor:** Manages workflow execution and ensures actions are performed reliably.

## Technologies Used
- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Messaging:** Apache Kafka
- **Blockchain Integration:** Solana SDK for token transfers
- **External APIs:** Email services (e.g., SendGrid, Nodemailer)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/floley.git
   cd floley
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Database connection URL
   - Kafka broker details
   - API keys for external services
   - Solana wallet credentials
   
4. Start the backend server:
   ```sh
   npm run dev
   ```
5. Start the frontend:
   ```sh
   cd frontend
   npm run dev
   ```
6. Run Kafka services and workers as required.

## Usage
- Users can log in and create workflows by selecting a **trigger** and linking it to one or more **actions**.
- When a trigger event occurs (e.g., GitHub webhook fires), Floley processes it via Kafka and executes the defined actions.
- Actions like **sending an email** or **transferring Solana tokens** will be executed asynchronously by the worker nodes.

## Future Enhancements
- Web3 wallet authentication
- More integrations with third-party services
- Enhanced logging and monitoring with Prometheus & Grafana

## Contributing
Pull requests are welcome! Please open an issue for discussion before submitting major changes.

## License
MIT License

