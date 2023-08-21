@extends('layouts.admin')

@section('content')
        <div class="card">
            <div class="card-header">
                <h3>Modifier l'étiquette
                    <a href="{{ route('admin.tags.index') }}" class="btn btn-primary float-right">
                        Retour
                    </a>
                </h3>
            </div>
            <div class="card-body">
                <form action="{{ route('admin.tags.update', $tag->id) }}" method="post">
                    @csrf
                    @method('put')
                    <div class="form-group">
                        <label for="name">Nom</label>
                        <input type="text" name="name" class="form-control" value="{{ old('name', $tag->name) }}">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Sauvegarder</button>
                    </div>
                </form>
            </div>
@endsection
