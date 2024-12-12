class GameManager {
    private static instance: GameManager;

    private playerScore: number;
    private playerName: string;

    private constructor() {
        this.playerScore = 0;
        this.playerName = "Player";
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
        GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public getPlayerScore(): number {
        return this.playerScore;
    }

    public setPlayerScore(score: number): void {
        this.playerScore = score;
    }

    public getPlayerName(): string {
        return this.playerName;
    }

    public setPlayerName(name: string): void {
        this.playerName = name;
    }

    public resetGame(): void {
        this.playerScore = 0;
        console.log("Game has been reset!");
    }

    public increaseScore(points: number): void {
        this.playerScore += points;
        console.log(`Score increased by ${points}, total score: ${this.playerScore}`);
    }
}
  
const gameManager1 = GameManager.getInstance();
gameManager1.setPlayerName("John");
gameManager1.increaseScore(10);

const gameManager2 = GameManager.getInstance();
console.log(gameManager2.getPlayerName());
console.log(gameManager2.getPlayerScore()); 

console.log(gameManager1 === gameManager2); // true
  