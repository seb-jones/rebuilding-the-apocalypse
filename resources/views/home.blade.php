@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div v-if="atEndGame()" class='row'>
        <div class='col-12 text-center p-3'>
            <button @click='win' type="button" class="btn btn-danger">Launch Nukes</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-7">
            <h2>Resources</h2>
            <materials-panel :resources='resources' :civ='civ'></materials-panel>

            <h2 class='mt-3'>Research</h2>
            <project-panel :completed-techs="completedTechs" :projects='availableTechs' :resources='resources'></project-panel>
        </div>
        <div class='col-md-4'>
            <h2>Reports</h2>
            <pre class='intelligence-panel'><template v-for="report in reports"><span :key="report.id">@{{ report.message }}</span><br></template></pre>
        </div>
    </div>
</div>
@endsection
