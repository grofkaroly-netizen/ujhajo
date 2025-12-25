let mode = 0;
const MAX_MODE = 2;

// ====== MÓDVÁLTÁS ======
input.onButtonPressed(Button.A, function () {
    mode--;
        if (mode < 0) {
                mode = MAX_MODE;
                    }
                        showMode();
                        });

                        input.onButtonPressed(Button.B, function () {
                            mode++;
                                if (mode > MAX_MODE) {
                                        mode = 0;
                                            }
                                                showMode();
                                                });

                                                function showMode(): void {
                                                    basic.showNumber(mode);
                                                        basic.pause(500);
                                                            basic.clearScreen();
                                                            }

                                                            // ====== MOTOROK ======
                                                            function motorForward(): void {
                                                                pins.digitalWritePin(DigitalPin.P8, 1);
                                                                    pins.digitalWritePin(DigitalPin.P12, 1);
                                                                    }

                                                                    function motorStop(): void {
                                                                        pins.digitalWritePin(DigitalPin.P8, 0);
                                                                            pins.digitalWritePin(DigitalPin.P12, 0);
                                                                            }

                                                                            // ====== 0 – FOLLOW ME ======
                                                                            function followMeMode(): void {
                                                                                if (pins.digitalReadPin(DigitalPin.P1) == 1) {
                                                                                        motorForward();
                                                                                            } else {
                                                                                                    motorStop();
                                                                                                        }
                                                                                                        }

                                                                                                        // ====== 1 – KŐ PAPÍR OLLÓ ======
                                                                                                        let rpsReady = true;

                                                                                                        input.onGesture(Gesture.Shake, function () {
                                                                                                            if (mode == 1 && rpsReady) {
                                                                                                                    rpsReady = false;
                                                                                                                            let r = randint(0, 2);

                                                                                                                                    if (r == 0) {
                                                                                                                                                basic.showIcon(IconNames.Square);       // KŐ
                                                                                                                                                        } else if (r == 1) {
                                                                                                                                                                    basic.showIcon(IconNames.SmallSquare); // PAPÍR
                                                                                                                                                                            } else {
                                                                                                                                                                                        basic.showIcon(IconNames.Scissors);    // OLLÓ
                                                                                                                                                                                                }

                                                                                                                                                                                                        basic.pause(2000);
                                                                                                                                                                                                                basic.clearScreen();
                                                                                                                                                                                                                        rpsReady = true;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            });

                                                                                                                                                                                                                            // ====== 2 – BOWLING ======
                                                                                                                                                                                                                            function bowlingMode(): void {
                                                                                                                                                                                                                                if (pins.digitalReadPin(DigitalPin.P1) == 1) {
                                                                                                                                                                                                                                        motorStop();
                                                                                                                                                                                                                                                basic.showIcon(IconNames.Skull);
                                                                                                                                                                                                                                                        basic.pause(1000);
                                                                                                                                                                                                                                                                basic.clearScreen();
                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                            motorForward();
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                // ====== FŐ CIKLUS ======
                                                                                                                                                                                                                                                                                basic.forever(function () {
                                                                                                                                                                                                                                                                                    if (mode == 0) {
                                                                                                                                                                                                                                                                                            followMeMode();
                                                                                                                                                                                                                                                                                                } else if (mode == 1) {
                                                                                                                                                                                                                                                                                                        motorStop();
                                                                                                                                                                                                                                                                                                            } else if (mode == 2) {
                                                                                                                                                                                                                                                                                                                    bowlingMode();
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                        });