<?php

namespace App\Http\Requests;

use App\Enums\TaskTypeCategory;
use App\Enums\TaskTypeStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskTypeRequest extends FormRequest
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
            'category' => ['required', Rule::in(TaskTypeCategory::values())],
            'default_unit' => ['required', 'string', 'max:40'],
            'status' => ['required', Rule::in(TaskTypeStatus::values())],
        ];
    }
}
