import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieService } from '../../services/movie.service';
import { movie } from '../movies/mockMovies';
import { of } from 'rxjs';

import { MovieComponent } from './movie.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AppSettingsService } from '../../services/app-settings.service';
import { By } from '@angular/platform-browser';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {

    var movieServiceSpy: jasmine.SpyObj<MovieService> = jasmine.createSpyObj('MovieService', ['getMovie']);
    var appSettingServiceSpy: jasmine.SpyObj<AppSettingsService> = jasmine.createSpyObj('AppSettingService',['getLanguage']);
    var activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot','paramMap', 'queryParamMap']);
    
  
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      providers: [{ provide: MovieService, useValue: movieServiceSpy },
                  { provide: ActivatedRoute, useValue: activatedRouteSpy },
                  { provide: AppSettingsService, useValue: appSettingServiceSpy }]
    })
    .compileComponents();

    movieServiceSpy.getMovie.and.returnValue(of(movie));

    activatedRouteSpy.paramMap = of(convertToParamMap({ id: '123' }));

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;

    //spy on asynchronous functions
    spyOn(component, 'getId').and.callFake(() => { })
    spyOn(component, 'subscribeToLangSubject').and.callFake(() => {
      component.movie=movie;
      component.loading=false;
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set movie variable on init', () => { 
    expect(component.movie).toEqual(movie);
  });

  it('should set movie data in its designated 2 card elements', () => {
    expect(fixture.debugElement.query(By.css('#movie-content-container'))).toBeDefined();
  });

  it('should expect loading container to be null', () => {
    expect(fixture.debugElement.query(By.css('#loading-container'))).toBeNull();
  });
});
