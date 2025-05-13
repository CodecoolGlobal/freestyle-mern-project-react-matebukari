# Who Wants to Be a Millionaire? Trivia Game

<details>
<summary><h2><strong>Table of Contents</strong></h2></summary>

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Contributors](#contributors)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

</details>


## About The Project

This **“Who Wants to Be a Millionaire?”** style web game delivers fast-paced trivia challenges with lifelines, score tracking, and escalating prize tiers all wrapped in an engaging, game-show inspired interface. Players answer multiple-choice questions, use strategic assists (50:50, ask the audience), and climb the money ladder toward the million-point jackpot. Real-time feedback and persistent leaderboards keep competition lively and encourage repeat play.

### Features

- **Answer multiple-choice questions** in "Who Wants to Be a Millionaire?" format.

- **Progressive challenge system** where questions grow harder as players ascend the prize ladder.

- **Users can create and submit** trivia questions to a shared MongoDB database.

- **Dynamically generated questions** from user-generated and predefined questions.

- **MongoDB-stored** user accounts track created questions and leaderboard

- **Containerization** via Docker Compose for simplified deployment processes

- **Continuous integration (CI) pipeline** implementing GitHub Actions for automated testing protocols and code quality assurance

<p align="center">
<img src="https://github.com/user-attachments/assets/f727c4c4-7772-4f1b-b219-407d16bd03d4" width="600" alt="Millionaire game"/> <br>
</p>

## Built With

- **Frontend**:  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)  
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

- **Backend**:  
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)  
  [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

- **Database**:  
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)  
  [![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

- **Containerization:**  
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Contributors

| Name         | GitHub Profile                              |
|--------------|---------------------------------------------|
| Marcell Nagy | [Dyrun](https://github.com/Dyrun)           |
| Ádám Németh  | [Nemetabe](https://github.com/nemetabe)     |
| Bukari Máté  | [Matebukari](https://github.com/matebukari) |

## Getting Started

Follow the steps below to run the application locally using Docker.

### Prerequisites

➡️ [Docker Desktop](https://www.docker.com/products/docker-desktop/) must be installed and running.


### Installation Steps

1. **Clone the Repository**
    - Open a **terminal** and navigate to the directory where you want to store the project. Then run:

```bash
git clone https://github.com/CodecoolGlobal/freestyle-mern-project-react-matebukari.git
cd freestyle-mern-project-react-matebukari
```

2. **Rename `example.env` File**
    - In the repository folder you can find the `example.env` file.
    - Rename the `example.env` file to `.env` by simply removing the `example` part.

3. **Start the Application with Docker**
    - Execute the following command in your terminal to build and start the containers:
      ```bash
      docker compose up --build
      ```

4. **Access the Application**
    - Open your browser and visit:  
      [http://localhost:3000](http://localhost:3000)

5. **Stopping the Application**
    - In your **terminal** press `Ctrl + C`
    - If you want to **stop and remove the containers**, but **keep the database data** for future runs, execute:
      ```bash
      docker compose down
      ```
      In this case, the database will **persist** between runs, and your data will still be available next time you start the application.

    - If you want to **stop, remove the containers and delete the database data**, execute:
      ```bash
      docker compose down -v
      ```
      In this case, the database and all stored data will be completely removed.

## Usage

#### Gameplay Walkthrough

1. **Start a New Game**
    - Click the **Play Now** button on the homepage.

2. **Answer Trivia Questions**
    - Each question displays **4 multiple-choice answers**.
    - Questions increase in difficulty as you ascend the prize ladder.

3. **Use Lifelines Strategically**
    - **50:50**: Eliminate two incorrect answers (click the 🎯 icon).
    - **Ask the Audience**: View simulated crowd percentages (click the 👥 icon).
    - **Joker Card**: Gives the correct answer.

4. **Track Your Progress**
    - Watch your earnings update in real-time on the **prize ladder**.

5. **Game Over or Victory**
    - **Cash Out**: Secure your current winnings at any time.
    - **Wrong Answer**: Game ends immediately.
    - **Victory**: Answer correctly to win the grand prize!

#### Managing User-Submitted Questions

1. **Submit a Question**:
    - Navigate to **your username** in the top right corner → **Add question**.
    - Enter:
        - Question text
        - Correct answer
        - 3 plausible wrong answers
        - Difficulty

2. **Browse Questions**:
    - Navigate to **your username** in the top right corner → **All questions**.

3. **Your Questions**:
    - Navigate to **your username** in the top right corner → **My questions**.
      - Delete or update any of your questions

## Acknowledgements
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) for the readme structure
- [Shields.io](https://shields.io/) for the badges