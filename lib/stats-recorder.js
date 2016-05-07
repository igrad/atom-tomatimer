'use babel'

import {today} from './time-formatter'

class StatsRecorder {
  constructor (stats) {
    // Default values
    this.history = {completions: 0}
    this.today = {day: today(), completions: 0}

    // Restore previous stats
    if (stats == null) return
    this.history.completions += stats.history.completions
    if (this.today.day === stats.today.day) {
      this.today.completions += stats.today.completions
    } else {
      this.history.completions += stats.today.completions
    }
  }

  addCompletion () {
    const day = today()
    if (day === this.today.day) {
      this.today.completions++
    } else {
      this.history.completions += this.today.completions
      this.today = {day: day, completions: 1}
    }
  }

  serialize () {
    const stats = {
      history: this.history,
      today: this.today
    }
    return { deserializer: 'StatsRecorder', stats: stats }
  }

  static deserialize (state) {
    return new StatsRecorder(state.stats)
  }
}

// Register with atom
atom.deserializers.add(StatsRecorder)

export default StatsRecorder