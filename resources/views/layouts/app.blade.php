<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    {{-- Globals passed from Laraval --}}
        <script defer>
    @if (isset($civ)) 
            window.civ = @json($civ);

            window.availableTechsRaw = [];
            @foreach($civ->availableTechs as $tech)
                window.availableTechsRaw.push({
                id: "{{ $tech->pivot->id }}",
                name: "{{ $tech->name }}",
                label: "{{ $tech->label }}",
                time_per_tick: "{{ $tech->time_per_tick }}",
                people: "{{ $tech->people }}",
                wood: "{{ $tech->wood }}",
                metal: "{{ $tech->metal }}",
                uranium: "{{ $tech->uranium }}",
                });
            @endforeach

            window.completedTechsRaw = @json($civ->completedTechs);
    @endif

    @if (isset($resourceData))
        window.resourceData = @json($resourceData);
    @endif
        </script> 

    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container-fluid">
                <!--a class="navbar-brand" href="{{ url('/') }}"-->
                <h1>{{ config('app.name', 'Laravel') }}</h1>
                <!--/a-->

                <div>
                    <!-- Left Side Of Navbar -->
                    {{--
                    <ul class="navbar-nav mr-auto">

                    </ul>
                    --}}

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        {{--
                        <button type='button' class='btn btn-danger' @click.prevent="reset">Reset</button>
                        --}}
                        @auth
                            <resource-bar :civ='civ' :resources='resources'></resource-bar>
                        @endauth
                        <!-- Authentication Links -->
                        {{--
                            @guest
                                <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    --}}
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>

    <div id='nuke-overlay' style='opacity: 1;'></div>
</body>
</html>
