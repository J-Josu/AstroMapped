class TimeLine {
  private MARK_DURATION: number;
  private length: number;
  private currentMark: number;
  private accumulatedTime: number;
  private onChangeSubscribers: ((currentMark?: number) => void)[];

  constructor(mark_duration: number, marks_quantity: number) {
    this.MARK_DURATION = mark_duration;
    this.length = marks_quantity;
    this.onChangeSubscribers = [];
    this.accumulatedTime = 0;
    this.currentMark = 0;
  }

  setLength(size: number) {
    this.length = size;
    this.currentMark = 0;
  }

  reset() {
    this.accumulatedTime = 0;
    this.currentMark = 0;
  }

  update(delta: number) {
    this.accumulatedTime += delta;
    if (this.accumulatedTime < this.MARK_DURATION) return;

    this.accumulatedTime = 0;
    this.nextMark();
  }

  setMark(index: number) {
    this.currentMark = index;
  }

  nextMark() {
    this.currentMark += 1;
    if (this.currentMark > this.length) this.currentMark = 0;

    this.onChangeSubscribers.forEach(callback => callback());
  }

  subscribe(callback: (currentMark?: number) => void) {
    this.onChangeSubscribers.push(callback);
  }
}

export { TimeLine };
