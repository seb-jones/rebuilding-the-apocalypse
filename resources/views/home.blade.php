@extends('layouts.app')

@section('content')
<div class="container-full">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2>Resources</h2>
            <materials-panel :resources='resources' :civ='civ'></materials-panel>

            <h2>Research</h2>
            <project-panel :projects='availableTechs' :resources='resources'></project-panel>

            <div v-if='completedTechs.length > 0' class='completed-techs'>
                <h2>Completed</h2>
                <p>
                    <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Toggle Visibility</button>
                </p>
                <div class="collapse" id="collapseExample">
                    <ul>
                        <li v-for="t in completedTechs" :key="t.id">@{{ t.label }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='col-md-4'>
            <h2>Reports</h2>
            <pre class='intelligence-panel'><template v-for="report in reports"><span :key="report.id">@{{ report.message }}</span><br></template></pre>
        </div>
    </div>
</div>
@endsection
