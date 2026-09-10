<?php

namespace App\Http\Requests;


use App\Enums\HarvestStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreHarvestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'field_crop_assignment_id' => ['required', 'integer', 'exists:field_crop_assignments,id'],
            'started_at' => ['required', 'date'],
            'ended_at' => ['required', 'date'],
            'status' => ['required', Rule::in(HarvestStatus::values())],
            'notes' => ['nullable', 'string', 'max:255'],
        ];
    }
}
