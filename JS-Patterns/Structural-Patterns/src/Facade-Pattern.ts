// Subsystems
class TV {
    turnOn() { console.log("TV ON"); }
    turnOff() { console.log("TV OFF"); }
}

class Speaker {
    turnOn() { console.log("Speaker ON"); }
    turnOff() { console.log("Speaker OFF"); }
}

class DVDPlayer {
    play() { console.log("Playing movie"); }
    stop() { console.log("Movie stopped"); }
}

class Lights {
    dim() { console.log("Lights dimmed"); }
    turnOn() { console.log("Lights ON"); }
}
  
  // Facade
class HomeTheaterFacade {

    constructor(private tv: TV, private speaker: Speaker, private dvd: DVDPlayer, private lights: Lights) {}

    watchMovie() {
        this.lights.dim();
        this.tv.turnOn();
        this.speaker.turnOn();
        this.dvd.play();
    }

    endMovie() {
        this.lights.turnOn();
        this.tv.turnOff();
        this.speaker.turnOff();
        this.dvd.stop();
    }
}
  

const homeTheater = new HomeTheaterFacade(new TV(), new Speaker(), new DVDPlayer(), new Lights());
homeTheater.watchMovie();
homeTheater.endMovie();
  