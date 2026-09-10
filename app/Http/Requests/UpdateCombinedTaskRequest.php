<?php

namespace App\Http\Requests;

use App\Enums\CombinedTaskStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCombinedTaskRequest extends FormRequest
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
            'description' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in(CombinedTaskStatus::values())],
            'task_type_ids' => ['nullable', 'array'], // массив TaskType ID
            'task_type_ids.*' => ['integer', 'exists:task_types,id'], // каждый элемент должен существовать в таблице task_types
        ];
    }
}
