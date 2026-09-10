<?php

namespace App\Http\Requests;

use App\Enums\FieldStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFieldRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'farm_id' => ['required', 'integer', 'exists:farms,id'],
            'name' => ['required', 'string', 'max:150'],
            'size_hectares' => ['required', 'numeric', 'min:0.01'],
            'soil_type' => ['nullable', 'string', 'max:100'],
            'status' => ['required', Rule::in(FieldStatus::values())],
        ];
    }
}
