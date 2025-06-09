// consensus_demo.js
class ConsensusSimulator {
    constructor() {
        this.validators = {
            pow: this.generateMiners(3),
            pos: this.generateStakers(3),
            dpos: this.generateDelegates(3)
        };
        this.voters = this.generateVoters(5);
    }

    // Generate mock miners with random computational power
    generateMiners(count) {
        return Array.from({length: count}, (_, i) => ({
            id: `miner${i+1}`,
            power: Math.floor(Math.random() * 100) + 1
        }));
    }

    // Generate mock stakers with random stake amounts
    generateStakers(count) {
        return Array.from({length: count}, (_, i) => ({
            id: `staker${i+1}`,
            stake: Math.floor(Math.random() * 1000) + 1
        }));
    }

    // Generate mock delegates
    generateDelegates(count) {
        return Array.from({length: count}, (_, i) => ({
            id: `delegate${i+1}`,
            votes: 0
        }));
    }

    // Generate mock voters that will vote for delegates
    generateVoters(count) {
        return Array.from({length: count}, (_, i) => ({
            id: `voter${i+1}`,
            stake: Math.floor(Math.random() * 100) + 1
        }));
    }

    // Simulate voting process for DPoS
    conductElection() {
        // Reset votes
        this.validators.dpos.forEach(d => d.votes = 0);
        
        // Each voter votes for a random delegate
        this.voters.forEach(voter => {
            const randomDelegateIndex = Math.floor(Math.random() * this.validators.dpos.length);
            this.validators.dpos[randomDelegateIndex].votes += voter.stake;
        });
        
        return [...this.validators.dpos].sort((a, b) => b.votes - a.votes);
    }

    // PoW: Select validator with highest computational power
    simulatePoW() {
        const selected = this.validators.pow.reduce((prev, current) => 
            (prev.power > current.power) ? prev : current
        );
        
        console.log("=== PROOF-OF-WORK (PoW) ===");
        console.log("Validators:", this.validators.pow);
        console.log(`Selected: ${selected.id} (Power: ${selected.power})`);
        console.log("Logic: The validator with the highest computational power is selected to create the next block.");
        console.log("Energy Requirement: Miners compete by solving cryptographic puzzles, which requires significant computational resources and energy.\n");
        
        return selected;
    }

    // PoS: Select validator with highest stake
    simulatePoS() {
        const selected = this.validators.pos.reduce((prev, current) => 
            (prev.stake > current.stake) ? prev : current
        );
        
        console.log("=== PROOF-OF-STAKE (PoS) ===");
        console.log("Validators:", this.validators.pos);
        console.log(`Selected: ${selected.id} (Stake: ${selected.stake})`);
        console.log("Logic: The validator with the highest amount of cryptocurrency staked is chosen to create the next block.");
        console.log("Difference from PoW: Instead of computational work, selection is based on economic stake, making it more energy-efficient.\n");
        
        return selected;
    }

    // DPoS: Select validator based on voting
    simulateDPoS() {
        const results = this.conductElection();
        const topCandidates = results.filter(d => d.votes === results[0].votes);
        const selected = topCandidates[Math.floor(Math.random() * topCandidates.length)];
        
        console.log("=== DELEGATED PROOF-OF-STAKE (DPoS) ===");
        console.log("Voters:", this.voters);
        console.log("Election Results:", results);
        console.log(`Selected: ${selected.id} (Votes: ${selected.votes})`);
        console.log("Logic: Token holders vote for delegates. The top-voted delegates take turns producing blocks.");
        console.log("Validator Selection: If multiple delegates have the same votes, one is chosen randomly from the top candidates.\n");
        
        return selected;
    }

    runAllSimulations() {
        console.log("🚀 STARTING CONSENSUS MECHANISM SIMULATION\n");
        this.simulatePoW();
        this.simulatePoS();
        this.simulateDPoS();
    }
}

// Run the simulation
const simulator = new ConsensusSimulator();
simulator.runAllSimulations();