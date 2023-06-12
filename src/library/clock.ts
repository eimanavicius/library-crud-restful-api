export abstract class Clock {
    abstract now(): Date;

    static system(): Clock {
        return new SystemClock();
    }

    static fixed(date: Date): Clock {
        return new FixedClock(date);
    }
}

class FixedClock extends Clock {
    constructor(private readonly date: Date) {
        super();
    }

    now(): Date {
        return this.date;
    }
}

class SystemClock extends Clock {
    now(): Date {
        return new Date();
    }
}
