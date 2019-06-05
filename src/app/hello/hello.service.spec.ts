import { Speaker } from './speaker';
import { Book } from './book';
import { HelloService } from './hello.service';

let speakerSpy: Speaker;
let bookSpy: Book;
let sut: HelloService;
describe('HelloService', () => {
  beforeEach(() => {
    speakerSpy = jasmine.createSpyObj('speaker', ['speak']);
    bookSpy = jasmine.createSpyObj('book', ['write']);
    sut = new HelloService(speakerSpy, bookSpy);
  });

  it('should build correct speech after calling sayOnSpeaker', () => {
    const speech = 'This is Sparta!';

    sut.sayOnSpeaker(speech);
    const actual = sut.getSpeech();

    expect(actual).toEqual('');
  });

  it('should build correct speech after calling sayOnSpeaker two times', () => {
    const say1 = 'First line';
    const say2 = 'Second line';

    sut.sayOnSpeaker(say1);
    sut.sayOnSpeaker(say2);
    const actual = sut.getSpeech();

    expect(actual).toEqual('');
  });

  it('should build correct speech after calling sayOnSpeaker and writeToBook', () => {
    const speakerLine = 'SpeakerSpeaker';
    const bookLine = 'BookBook';

    sut.sayOnSpeaker(speakerLine);
    sut.writeToBook(bookLine);
    const actual = sut.getSpeech();

    expect(actual).toEqual(bookLine);
  });

  describe('sayOnSpeaker', () => {
    it('should call Speaker', () => {
      // Given
      const speechLine = 'This is Sparta!';

      // When
      sut.sayOnSpeaker(speechLine);

      // Then
      expect(speakerSpy.speak).toHaveBeenCalledWith(speechLine);
    });

    it('should call Speaker 3 times if called 3 times', () => {
      sut.sayOnSpeaker('1');
      sut.sayOnSpeaker('2');
      sut.sayOnSpeaker('3');

      expect(speakerSpy.speak).toHaveBeenCalledTimes(3);
    });
  });

  describe('getSpeech', () => {
    it('should be initialized empty', () => {
      expect(sut.getSpeech()).toEqual('');
    });
  });
});
