'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">flypass-find-movies documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FailedServiceComponent.html" data-type="entity-link" >FailedServiceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FeaturedMoviesComponent.html" data-type="entity-link" >FeaturedMoviesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FeaturedSeriesComponent.html" data-type="entity-link" >FeaturedSeriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainHeaderComponent.html" data-type="entity-link" >MainHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainLayoutComponent.html" data-type="entity-link" >MainLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnbordingFeaturedComponent.html" data-type="entity-link" >OnbordingFeaturedComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnbordingMasterComponent.html" data-type="entity-link" >OnbordingMasterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OnbordingPremieresComponent.html" data-type="entity-link" >OnbordingPremieresComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PosterDetailContentComponent.html" data-type="entity-link" >PosterDetailContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PosterDetailHeaderComponent.html" data-type="entity-link" >PosterDetailHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PosterDetailMasterComponent.html" data-type="entity-link" >PosterDetailMasterComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/FormFocusDirective.html" data-type="entity-link" >FormFocusDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ConsoleLogStrategy.html" data-type="entity-link" >ConsoleLogStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/SessionStorage.html" data-type="entity-link" >SessionStorage</a>
                            </li>
                            <li class="link">
                                <a href="classes/TheMovieDBPort.html" data-type="entity-link" >TheMovieDBPort</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AplicationStore.html" data-type="entity-link" >AplicationStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpTmdbAdapterService.html" data-type="entity-link" >HttpTmdbAdapterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogStrategyService.html" data-type="entity-link" >LogStrategyService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpHeadersInterceptor.html" data-type="entity-link" >HttpHeadersInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/RefactorUrlInterceptor.html" data-type="entity-link" >RefactorUrlInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CreatedBy.html" data-type="entity-link" >CreatedBy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Dates.html" data-type="entity-link" >Dates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EncryptionStrategy.html" data-type="entity-link" >EncryptionStrategy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Genre.html" data-type="entity-link" >Genre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Genre-1.html" data-type="entity-link" >Genre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LastEpisodeToAir.html" data-type="entity-link" >LastEpisodeToAir</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggerStrategy.html" data-type="entity-link" >LoggerStrategy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MoviesState.html" data-type="entity-link" >MoviesState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Network.html" data-type="entity-link" >Network</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutFeaturedMovie.html" data-type="entity-link" >OutFeaturedMovie</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutFeaturedSerie.html" data-type="entity-link" >OutFeaturedSerie</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutMovieDetail.html" data-type="entity-link" >OutMovieDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutSearchMulti.html" data-type="entity-link" >OutSearchMulti</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutSerieDetail.html" data-type="entity-link" >OutSerieDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutTrending.html" data-type="entity-link" >OutTrending</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductionCompany.html" data-type="entity-link" >ProductionCompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductionCountry.html" data-type="entity-link" >ProductionCountry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductionCountry-1.html" data-type="entity-link" >ProductionCountry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result.html" data-type="entity-link" >Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-1.html" data-type="entity-link" >Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-2.html" data-type="entity-link" >Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-3.html" data-type="entity-link" >Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Season.html" data-type="entity-link" >Season</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SeriesState.html" data-type="entity-link" >SeriesState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpokenLanguage.html" data-type="entity-link" >SpokenLanguage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpokenLanguage-1.html" data-type="entity-link" >SpokenLanguage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StorageDataRepository.html" data-type="entity-link" >StorageDataRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StorageStrategy.html" data-type="entity-link" >StorageStrategy</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/RuntimeFormatPipe.html" data-type="entity-link" >RuntimeFormatPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});