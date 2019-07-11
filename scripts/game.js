export default class Game {
    scores = 0;
    line = 0;
    level = 0;
    playField = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    activePeace = {
        x: 0,
        y: 0,
        get blocks() {
            return this.rotations[this.rotationIndex];
        },
        rotationIndex: 0,
        rotations: [
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ]
        ]
    };

    movePieceLeft() {
        this.activePeace.x -= 1;

        if (this.hasCollision()) {
            this.activePeace.x += 1;
        }
    }

    movePieceRight() {
        this.activePeace.x += 1;

        if (this.hasCollision()) {
            this.activePeace.x -= 1;
        }
    }

    movePieceDown() {
        this.activePeace.y += 1;

        if (this.hasCollision()) {
            this.activePeace.y -= 1;
            this.lockPiece();
        }
    }

    rotatePiece() {
        this.activePeace.rotationIndex = this.activePeace.rotationIndex < 3 ? this.activePeace.rotationIndex + 1 : 0;
        console.log('Has collision: ', this.hasCollision());
        if (this.hasCollision()) {
            this.activePeace.rotationIndex = this.activePeace.rotationIndex > 0 ? this.activePeace.rotationIndex - 1 : 3;
        }

        return this.activePeace.blocks;
    }

    hasCollision() {
        const { y: pieceY, x: pieceX, blocks} = this.activePeace;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (
                    blocks[y][x] && 
                    ((this.playField[pieceY + y] === undefined || this.playField[pieceY + y][pieceX + x] === undefined) ||
                    this.playField[pieceY + y][pieceX + x])
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    lockPiece() {
        const { y: pieceY, x: pieceX, blocks } = this.activePeace;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playField[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
    }
}