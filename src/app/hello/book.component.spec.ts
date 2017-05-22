import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Book } from './book';
import { BookComponent } from './book.component';

let fixture: ComponentFixture<BookComponent>;
let book: Book;

describe('BookComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ BookComponent ],
            providers: [Book]
        });

        fixture = TestBed.createComponent(BookComponent);
        book = fixture.debugElement.injector.get(Book);
    });

    it('displays no li elements if no line written', () => {
        fixture.detectChanges();
        let liElements = fixture.debugElement.queryAll(By.css('ol li'));

        expect(liElements).toEqual([]);
    });

    it('displays a li with matching content if 1 line written', () => {
        const line = 'hello my friend';

        book.write(line);
        fixture.detectChanges();
        let liElement = fixture.debugElement.query(By.css('ol li'));

        expect(liElement.nativeElement.textContent).toEqual(line);
    });

    it('displays five li if five lines written to book', () => {
        book.write('1');
        book.write('2');
        book.write('3');
        book.write('4');
        book.write('5');
        fixture.detectChanges();
        let liElements = fixture.debugElement.queryAll(By.css('ol li'));

        expect(liElements.length).toEqual(5);
    });
});
