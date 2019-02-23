@extends('layouts.app')

@section('content')
<div class="container-full">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2>Resources</h2>
            <materials-panel :resources='resources' :civ='civ'></materials-panel>

            <h2>Research</h2>
            <project-panel :projects='availableTechs'></project-panel>

            <h2>Building</h2>
            <project-panel :projects='availableBuildings'></project-panel>
        </div>
        <div class='col-md-4'>
            <h2>Reports</h2>
            <pre class='intelligence-panel'><template v-for="report in reports"><span :key="report.id">@{{ report.message }}</span><br></template></pre>
        </div>
    </div>
</div>
@endsection
