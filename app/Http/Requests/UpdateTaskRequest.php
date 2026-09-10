<?php

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
            'field_id' => ['required', 'integer', 'exists:fields,id'],
            'season_id' => ['required', 'integer', 'exists:seasons,id'],
            'task_type_id' => ['required', 'integer', 'exists:task_types,id'],
            'combined_task_id' => ['nullable', 'integer', 'exists:combined_tasks,id'],
            'title' => ['required', 'string', 'max:150'],
            'planned_for' => ['required', 'date', 'after:today'],
            'status' => ['required', Rule::in(TaskStatus::values())],
            'notes' => ['nullable', 'string'],
        ];
    }
}
