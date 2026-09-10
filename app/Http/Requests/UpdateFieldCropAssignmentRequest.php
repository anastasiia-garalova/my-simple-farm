<?php

namespace App\Http\Requests;

use App\Enums\FieldCropAssignmentStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFieldCropAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'field_id' => ['required', 'integer', 'exists:fields,id'],
            'crop_id' => ['required', 'integer', 'exists:crops,id'],
            'season_id' => ['required', 'integer', 'exists:seasons,id'],
            'status' => ['required', Rule::in(FieldCropAssignmentStatus::values())],
            'planned_area_hectares' => ['required', 'numeric', 'min:0.01'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
