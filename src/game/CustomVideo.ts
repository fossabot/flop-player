import { BaseVideo, VideoEvent } from '@/game/BaseVideo'

export class CustomVideo extends BaseVideo {
  protected mName = 'CustomVideo'
  protected mWidth: number
  protected mHeight: number
  protected mMines: number
  protected mMarks: boolean
  protected mBoard: number[]
  protected mPlayer: Uint8Array = new Uint8Array()
  protected mEvents: VideoEvent[] = []

  constructor (width: number, height: number, mines: number, marks: boolean, board: number[]) {
    super(new Uint8Array())
    this.mWidth = width
    this.mHeight = height
    this.mMines = mines
    this.mMarks = marks
    this.mBoard = board
  }
}
