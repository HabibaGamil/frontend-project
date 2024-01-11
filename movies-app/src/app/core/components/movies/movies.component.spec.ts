import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieService } from '../../services/movie.service';
import { mockMovies } from './mockMovies';
import { of } from 'rxjs';

import { MoviesComponent } from './movies.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import {  MatCard, MatCardHeader} from '@angular/material/card';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {

    let movieServiceSpy: jasmine.SpyObj<MovieService> = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
      declarations: [MoviesComponent, MovieItemComponent, MatCard, MatCardHeader],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    })
    .compileComponents();

    movieServiceSpy.getMovies.and.returnValue(of(mockMovies));

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should populate movies array after ngOnInit', ()=>{
    expect(component.movies).toEqual(mockMovies);
  });
  it('should populate movies DOM', ()=>{
    const movieElements = fixture.nativeElement.querySelectorAll('app-movie-item');
    expect(movieElements.length).toBe(3);
  });
});
