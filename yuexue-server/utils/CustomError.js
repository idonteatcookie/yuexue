class CustomError {
    constructor(message) {
        this.message = message
    }

    toReturnVo() {
        return {
            success: false,
            msg: this.message
        }
    }
}

module.exports = CustomError