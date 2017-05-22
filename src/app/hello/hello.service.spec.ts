import { Speaker } from './speaker';
import { Book } from './book';
import { HelloService } from './hello.service';

const speakerFake = {
  speak: (v: string) => {}
} as Speaker;
const bookFake = {
  write: (v: string) => {}
} as Book;
let sut: HelloService;

describe('HelloService', () => {
  beforeEach(() => {
    sut = new HelloService(speakerFake, bookFake);
  });

  it('should build correct speech after calling sayOnSpeaker', () => {
    const speech = 'This is Sparta!';

    sut.sayOnSpeaker(speech);
    let actual = sut.getSpeech();

    expect(actual).toEqual('');
  });

  it('should build correct speech after calling sayOnSpeaker two times', () => {
    const say1 = 'First line';
    const say2 = 'Second line';

    sut.sayOnSpeaker(say1);
    sut.sayOnSpeaker(say2);
    let actual = sut.getSpeech();

    expect(actual).toEqual('');
  });

  it('should build correct speech after calling sayOnSpeaker and writeToBook', () => {
    const speakerLine = 'SpeakerSpeaker';
    const bookLine = 'BookBook';

    sut.sayOnSpeaker(speakerLine);
    sut.writeToBook(bookLine);
    let actual = sut.getSpeech();

    expect(actual).toEqual(bookLine);
  });

  describe('sayOnSpeaker', () => {
    it('should call Speaker', () => {
      // Given
      const speechLine = 'This is Sparta!';
      spyOn(speakerFake, 'speak');

      // When
      sut.sayOnSpeaker(speechLine);

      // Then
      expect(speakerFake.speak).toHaveBeenCalledWith(speechLine);
    });

    it('should call Speaker 3 times if called 3 times', () => {
      spyOn(speakerFake, 'speak');

      sut.sayOnSpeaker('1');
      sut.sayOnSpeaker('2');
      sut.sayOnSpeaker('3');

      expect(speakerFake.speak).toHaveBeenCalledTimes(3);
    });
  });

  describe('getSpeech', () => {
    it('should be initialized empty', () => {
      expect(sut.getSpeech()).toEqual('');
    });
  });
});
