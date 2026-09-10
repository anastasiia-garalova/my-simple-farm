<?php

namespace App\Http\Requests;

use App\Enums\CropCategory;
use App\Enums\CropStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCropRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'category' => ['required', Rule::in(CropCategory::values())],
            'status' => ['required', Rule::in(CropStatus::values())],
            'notes' => ['nullable', 'string'],
        ];
    }
}
